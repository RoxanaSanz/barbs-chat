import { reactive } from 'vue';

const eventBus = reactive({
  flagLoginActive: true,
  flagIsAdmin: false,
  infoClient: null,
  flagLoginClientId: null,
});

export default eventBus;