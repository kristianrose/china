var mongoose = require('mongoose')
var Schema = mongoose.Schema
mongoose.connect(`mongodb+srv://koala:yae123@yae.dcwq8.mongodb.net/DB`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, }, (err) => {
  if (err) return console.log('Erro ao conectar ao banco de dados!')
  console.log('Conectada ao banco de dados com sucesso!')
})

var User = new Schema({
  _id: {
    type: String
  },
  lastMarriageAttempt: { type: Number, default: 0 },
  marriage: {
    marriedTo: { type: String, default: "" },
    marriedTimestamp: { type: Number, default: 0 }
  },
    developer: {
    type: Boolean,
    default: false
  },
   rolUserAdv: {
    type: Boolean,
    default: false
  },
  rolUserAdv1: {
    type: Boolean,
    default: false
  },
  rolUserAdv2: {
    type: Boolean,
    default: false
  },
      autorole: {
        status: String,
        role: String
    },
  AdvKarma: {
    type: Array,
    default: []
  },
  dailyTime: {
    type: Number,
    default: 0
  },
  bgprofile: {
    type: String,
    default: ''
  },
  favcolor: {
    type: String,
    default: '#f3052f'
  },
  diamond: {
    type: Number,
    defaut: 0
  },
  bgbio: {
    type: String,
    default: ''
  },
  casou: {
    type: String,
    defaunt: ''
  },
  ambar: {
    type: Number,
    default: 0
  },
  rubi: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 0
  },
  bangif: {
    type: String,
    default: ''
  },
  adv: {
    type: Number,
    default: 0
  },
  adv_motivos: {
    type: Array,
    default: []
  },
  guildlevel: {
    type: Number,
    default: 0
  },
  nexDay: {
    type: Number,
    default: 0
  },
  star: {
    type: Number,
    default: 0

  },
  starTime: {
    type: Number,
    default: 0
  },
  repTime: {
    type: Number,
    default: 0
  },

  dayCol: {
    type: Number,
    default: 0
  },
  premium: {
    type: Boolean,
    default: false
  },
  bio: {
    type: String,
    default: 'Nenhuma desc'
  },
  rep: {
    type: Number,
    default: 0
  },
  perf: {
    type: Number,
    default: 0
  },
  perfTime: {
    type: Number,
    default: 0
  },
  adv: {
    type: Number,
    default: 0
  },
  names: {
    type: Array,
    default: []

  }
})

var Bloqueio = new Schema({
  _id: {
    type: String
  },
  block: {
    type: String,
    default: ''
  },
  exilio: {
    type: String,
    default: ''
  }
})

var BloqueioS = new Schema({
  _id: {
    type: String
  },
  blockguild: {
    type: String,
    default: ''
  }
})

var Guilds = new Schema({
  _id: {
    type: String
  },
  autorole: {
    status: String,
    role: String
},
  cargoperm: {
    type: String,
    default: ''
  },
  perms: {
    type: String,
    default: ''
  },
  setprefix: {
    type: String,
    default: 'n!'
  },
  rolAdv: {
    type: String,
    default: ''
  },
  rolAdv1: {
    type: String,
    default: ''
  },
  rolAdv2: {
    type: String,
    default: ''
  },
  capslock: {
    type: Number,
    default: 0
  },
   massBan: {
    type: Boolean,
    default: false
  },
   massBanLog: {
    type: String,
    default: ''
  },
  contadorCOR: {
    type: String,
    default: ''
  },
  convitesCanais: {
    type: Array,
    default: []
  },
  linksCanais: {
    type: Array,
    default: []
  },
  spoilerCanais: {
    type: Array,
    default: []
  },
  usernames: {
    type: Boolean,
    default: false
  },
  prefixo: {
    type: String,
    default: 'n!'
  },
  prefixoo: {
    type: String,
    default: 'n!'
  },
  msgDeleteBv: {
    type: Number,
    default: 0
  },
  msgDeleteDm: {
    type: Number,
    default: 0
  },
  msgDeleteBye: {
    type: Number,
    default: 0
  },
  imune: {
    type: String,
    default: ''
  },
  contaS: {
    type: Number,
    default: 0
  },
  lang: {
    type: String,
    default: 'pt-BR'
  },
  setlang: {
    type: String,
    default: 'BR'
  },
  contadorE: {
    type: String,
    default: ''
  },
  bkchannel: {
    type: Array,
    default: []
  },
  invites: {
    type: String,
    default: ''
  },
  logg_MD: {
    type: String,
    default: ''
  },
  logg_MUP: {
    type: String,
    default: ''
  },
  logg_mGA: {
    type: String,
    default: ''
  },
  logg_mGR: {
    type: String,
    default: ''
  },
  logg_mGB: {
    type: String,
    default: ''
  },
  logg_banAction: {
    type: String,
    default: ''
  },
  logg_wordsAction: {
    type: String,
    default: ''
  },
  logg_desbanAction: {
    type: String,
    default: ''
  },
  logg_userinfoAction: {
    type: String,
    default: ''
  },
  logg_adv: {
    type: String,
    default: ''
  },
  logg_mute: {
    type: String,
    default: ''
  },
  logg_registros: {
    type: String,
    default: ''
  },
  logg_fakes: {
    type: String,
    default: ''
  },
  contador: {
    type: String,
    default: ''
  },
  beta: {
    type: Array,
    default: []
  },
  td: {
    type: Boolean,
    default: false
  },
  md: {
    type: Boolean,
    default: false
  },
  bot: {
    type: Boolean,
    default: false
  },
  spoilers: {
    type: Boolean,
    default: false
  },
  fakes: {
    type: Boolean,
    default: false
  },
  animado: {
    type: String,
    default: ''
  },
  numero: {
    type: String,
    default: ''
  },
  contadora: {
    type: String,
    default: ''
  },
  txt: {
    type: String,
    default: ''
  },
  spammlog: {
    type: String,
    default: ''
  },
  autorole: {
    type: String,
    default: ''
  },
  autoroleArray: {
    type: Array,
    default: []
  },
   autorolebot: {
    type: Array,
    default: []
  },
  autoroleid: {
    type: String,
    default: ''
  },
  welcome: {
    type: String,
    default: ''
  },
  welcomeauthor: {
    type: String,
    default: ''
  },
  welcomeChannel: {
    type: String,
    default: ''
  },
  rremove: {
    type: String,
    default: ''
  },
  rremoveChannel: {
    type: String,
    default: ''
  },
  words: {
    type: Array,
    default: []
  },
  filterInvites: {
    type: Boolean,
    default: false
  },
  convites: {
    type: Boolean,
    default: false
  },
  apng: {
    type: Boolean,
    default: false
  },
  registrado: {
    type: Array,
    default: []
  },
  convitesES: {
    type: Boolean,
    default: false
  },
  invs: {
    type: Boolean,
    default: false
  },
  raid: {
    type: Boolean,
    default: false
  },
  exlinks: {
    type: Boolean,
    default: false
  },
  AFk: {
    type: Boolean,
    default: false
  },
  AFKR: {
    type: String,
    default: ''
  },

  filterPrintscreen: {
    type: Boolean,
    default: false
  },
  filterWords: {
    type: Array,
    default: []
  },
  sugest: {
    type: String,
    default: ''
  },
  muterole: {
    type: String,
    default: 'Yae Mute'
  },
  menino: {
    type: String,
    default: ''
  },
  menina: {
    type: String,
    default: ''
  },
  principiante: {
    type: String,
    default: ''
  },
  staff: {
    type: String,
    default: ''
  },
  logging: {
    type: String,
    default: ''
  },
  texto: {
    type: String,
    default: ''
  },
  rol1: {
    type: String,
    default: ''
  },
  rol2: {
    type: String,
    default: ''
  },
  rol3: {
    type: String,
    default: ''
  },
  rol4: {
    type: String,
    default: ''
  },
  rol5: {
    type: String,
    default: ''
  },
  staffanuncio: {
    type: String,
    default: ''
  },
  banlog: {
    type: String,
    default: ''
  },
  logger: {
    type: String,
    default: ''
  },
  bye: {
    type: String,
    default: ''
  },
  byeChannel: {
    type: String,
    default: ''
  },
  dm: {
    type: String,
    default: ''
  },
  slow: {
    type: Number,
    default: 0
  },
  sloww: {
    type: Number,
    default: 0
  },
  maa: {
    type: Number,
    default: 0
  },
  moo: {
    type: Number,
    default: 0
  },
  ma: {
    type: String,
    default: ''
  },
  mo: {
    type: String,
    default: ''
  },
  nvl1: {
    type: Boolean,
    default: false
  },
  banChannel: {
    type: String,
    default: ''
  },
  muteChannel: {
    type: String,
    default: ''
  },
  reporteChannel: {
    type: String,
    default: ''
  },
  girl: {
    type: String,
    default: ''
  },
  man: {
    type: String,
    default: ''
  },
  staffer: {
    type: String,
    default: ''
  },
  aregs: {
    type: Array,
    default: []
  },
  nb: {
    type: String,
    default: ''
  },
  nvll: {
    type: Number,
    default: 0
  },
  exps: {
    type: Number,
    default: 0
  },
  upar: {
    type: Boolean,
    default: true
  },
  filtrof: {
    type: String,
    default: ''
  },
  am_role: {
    type: Boolean,
    default: false
  }
})

var Striker = new Schema({
  _id: {
    type: String
  },
  Striker1: {
    type: String,
    default: ''
  },
  Striker2: {
    type: String,
    default: ''
  },
  Striker3: {
    type: String,
    default: ''
  }
})

var Registrador = new Schema({
  _id: {
    type: String
  },
  mh: {
    type: Number,
    default: 0
  },
  hm: {
    type: Number,
    default: 0
  },
  nbinario: {
    type: Number,
    default: 0
  },
  repR: {
    type: Number,
    default: 0
  },
  registrado: {
    type: String,
    default: ''
  },
  executor: {
    type: String,
    default: ''
  },
  data: {
    type: String,
    default: ''
  }
})

var Registrar = new Schema({ _id: { type: String },
  regs: { type: Array, default: [] },
  regsArray: { type: Array, default: [] }
})

var GuildRegister = new Schema({ _id: { type: String },
  regs: {
    type: Number,
    default: 0
  }
})

var Usuario = new Schema({ _id: { type: String }, banImage: { type: String, default: '' } })

var Premium = new Schema({
  userID: String,
  guildID: String,
  startDate: String,
  tag: String,
  call: String,
  tagID: String,
  callID: String,
})

var Guilds = mongoose.model('Guilds', Guilds)
var Users = mongoose.model('Users', User)
var Strikers = mongoose.model('Strikers', Striker)
var Bloqueio = mongoose.model('Bloqueio', Bloqueio)
var Registrador = mongoose.model('Registrador', Registrador)
var Registrar = mongoose.model('Registrar', Registrar)
var GuildRegister = mongoose.model('GuildRegister', GuildRegister)
var Usuario = mongoose.model('Usuario', Usuario)
var Premium = mongoose.model('Premium', Premium)

exports.Bloqueio = Bloqueio
exports.Users = Users
exports.Guilds = Guilds
exports.Striker = Strikers
exports.Registrador = Registrador
exports.Registrar = Registrar
exports.GuildRegister = GuildRegister
exports.Usuario = Usuario
exports.Premium = Premium
