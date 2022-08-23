var HA_URL = process.env.HA_URL || 'localhost:8123/api'
var HA_TOKEN = process.env.HA_TOKEN || ''
const axios = require('axios').default;

const haEntities = ['switch', 'light', 'climate', 'humidifier']
const haToggles = {
    climate: {
        heat_cool: 'turn_off',
        off: 'turn_on',
    },
}



const getStates = async () => {
    try {
        return (await axios.get(`${HA_URL}/states`, {
            headers: { "Authorization": "Bearer " + HA_TOKEN }
        })).data
    } catch (err) {
        console.log(err)
    }
}


const setService = async (entityId, action) => {
    try {
        return (await axios.post(`${HA_URL}/services/${entityId.split('.')[0]}/${action}`, {
            entity_id: entityId
        }, {
            headers: { "Authorization": "Bearer " + HA_TOKEN }
        })).data
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    getStates,
    setService,
    haEntities,
    haToggles
}
