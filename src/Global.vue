<script>
export default {
  data: {
    chara: {},
    setting: {},
    history: [],
    show: {
      place: '',
      action: '',
      text: []
    },
    event: {},
  },
  frame: {
    newGame: 0,
    leftShow: 0,
    rightShow: 0,
    saveAload: false,
    loadOnly: false,
    ModLoader: false,
    setting: 0,
    commonDialog: false,
  },
  func: {
    state: {
      loading: 0,
      cnt: 0,
    }
  },
  webrtc: null,
  debug: true
}
</script>
