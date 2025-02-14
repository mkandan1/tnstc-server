import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';

const getCookieFromHeader = (req, cookieName) => {
    const cookieHeader = req.headers.cookie;

    if (!cookieHeader) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "No cookies found in the request header!");
    }

    const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
    const targetCookie = cookies.find((cookie) => cookie.startsWith(`${cookieName}=`));
    const cookieValue = targetCookie ? targetCookie.split("=")[1] : null;

    if (!cookieValue) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid or missing token! Please login.");
    }

    return cookieValue;
};


export default getCookieFromHeader
