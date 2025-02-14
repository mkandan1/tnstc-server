import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import { authService, userService, tokenService } from '../services/index.js';
import config from '../config/config.js';
import getCookieFromHeader from '../utils/cookie.js';
import emailService from '../services/email.service.js';

const addEmployee = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  await emailService.sendWelcomeEmail(user.email, req.body.password, user.firstName, user.role);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  const ipAddress = req.ip;
  const device = req.headers['user-agent'];
  const time = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  await emailService.sendLoginAlertEmail(email, device, ipAddress, time);
  res.cookie('x-token', tokens.access.token, {
    secure: true,
    path: '/',
    expires: new Date(Date.now() + config.jwt.accessExpirationMinutes * 60 * 60)
  });

  res.cookie('rfs-token', tokens.refresh.token, {
    httpOnly: true,
    secure: true,
    path: '/',
    expires: new Date(Date.now() + config.jwt.refreshExpirationDays * 24 * 60 * 60 * 1000)
  })

  res.send({ success: true, user, tokens });
});

const currentUser = catchAsync(async (req, res) => {
  const refreshToken = getCookieFromHeader(req, 'rfs-token');
  const user = await authService.getUserByToken(refreshToken);
  res.status(httpStatus.OK).send({ user })
})

const logout = catchAsync(async (req, res) => {
  const refreshToken = getCookieFromHeader(req, 'rfs-token')
  await authService.logout(refreshToken);
  res.cookie('x-token', '', {
    secure: true,
  });

  res.cookie('rfs-token', '', {
    httpOnly: true,
  })
  res.status(httpStatus.OK).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const refreshToken = getCookieFromHeader(req, 'rfs-token')
  const tokens = await authService.refreshAuth(refreshToken);

  res.cookie('x-token', tokens.access.token, {
    secure: true,
    path: '/',
    expires: new Date(Date.now() + config.jwt.accessExpirationMinutes * 60 * 60)
  });

  res.cookie('rfs-token', tokens.refresh.token, {
    httpOnly: true,
    secure: true,
    path: '/',
    expires: new Date(Date.now() + config.jwt.refreshExpirationDays * 24 * 60 * 60 * 1000)
  })
  res.send({ success: true, token: tokens.access.token });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  addEmployee,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  currentUser
};
