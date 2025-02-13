const { Maintenance } = require('../models')

const getMaintenanceStatus = async (req, res) => {
    try {
        const maintenance = await Maintenance.findOne();
        if (!maintenance) {
            return res.status(200).json({ maintenance: false, message: 'Maintenance data not found' });
        }
        res.status(200).json({ maintenance: maintenance.isMaintenance });
    } catch (error) {
        console.error('Error fetching maintenance status:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const checkMaintenanceStatus = async () => {
    const maintenance = await Maintenance.findOne();
    if (!maintenance) {
        return false;
    }
    return maintenance.isMaintenance;
}

const setMaintenanceStatus = async (req, res) => {
    const { isMaintenance, _id } = req.body;

    try {
        let maintenance = await Maintenance.findById(_id);

        if (!maintenance) {
            maintenance = new Maintenance({ isMaintenance, message, endTime });
        } else {
            maintenance.isMaintenance = isMaintenance;
        }

        await maintenance.save();
        res.status(200).json({ message: 'Maintenance status updated successfully', maintenance });
    } catch (error) {
        console.error('Error updating maintenance status:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getMaintenanceStatus, setMaintenanceStatus, checkMaintenanceStatus };