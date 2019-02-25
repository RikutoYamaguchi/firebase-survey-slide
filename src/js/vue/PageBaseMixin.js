import { mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    ...mapActions(['initialize'])
  },
  computed: {
    ...mapGetters(['currentProject']),
  }
}
