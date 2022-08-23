var express = require('express');
var ha = require('../ha');
var router = express.Router();

var INTERVAL = process.env.INTERVAL || 60000
INTERVAL = parseInt(INTERVAL)

var SHOW_HEADER = process.env.SHOW_HEADER || 'true'
SHOW_HEADER = Boolean(SHOW_HEADER)

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function normalizeTitle(str) {
  return String(str).replace('_', ' ')
}

function mapActions(actions) {
  return actions.map((v) => { return { title: normalizeTitle(v), action: v } })
}

function getExcludeEntity() {
  s = process.env.EXCLUDE_ENTITY || ''
  return s.split(',')
}

const buildCard = async () => {

  haStates = await ha.getStates()
  if (!haStates) {
    return []
  }
  cards = haStates.map(e => {
    r = {}
    for (let i in ha.haEntities) {
      haEntity = ha.haEntities[i]
      if (e.entity_id.split('.')[0] == haEntity) {
        r = {
          title: e.attributes.friendly_name,
          entityId: e.entity_id,
          type: capitalize(haEntity),
          state: e.state,
          entity: e,
        }
        break
      }
    }
    return r
  }).filter(e => { return !!e['title'] }).filter(e => { return !getExcludeEntity().includes(e['entityId']) });
  return cards
}

const displayCheck = (card, loading) => {
  const base = 'box-border'
  var black = base + " black-box"
  var grey = base + " grey-box"
  if (card.entityId == loading) {
    return grey
  }

  if (!card.state.includes('off')) {
    return base
  } else {
    return black
  }
}

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('index', {
    cards: await buildCard(),
    loading: req.query.loading,
    interval: INTERVAL,
    displayCheck,
    showHeader: SHOW_HEADER,
    currentPage: "/",
  });
});

router.get('/:entityId/:state', async (req, res, next) => {
  domain = req.params.entityId.split('.')[0]
  toggle = ha.haToggles[domain] ? ha.haToggles[domain][req.params.state] : 'toggle'
  re = await ha.setService(req.params.entityId, toggle)
  res.redirect(`/?loading=${req.params.entityId}`);
});

module.exports = router;
