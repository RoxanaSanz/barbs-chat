<template>
  <div class="main">
    <div class="containerInMain">
      <div :class="{
        'wrapper text-slate-200 bg-slate-800': flagModeDark,
        'wrapper text-slate-900 bg-white': !flagModeDark
      }">
        <div class="heading">
          <h1 :class="{
            'text text-large text-slate-200': flagModeDark,
            'text text-large text-slate-900': !flagModeDark
          }">
            ¡Bienvenido!</h1>
          <div class="striped">
            <span class="striped-line"></span>
            <span :class="{
              'striped-text text-slate-200': flagModeDark,
              'striped-text text-slate-900': !flagModeDark
            }">¿Necesitas ayuda?</span>
            <span class="striped-line"></span>
          </div>
          <p :class="{
            'text text-normal text-slate-200': flagModeDark,
            'text text-normal text-slate-900': !flagModeDark
          }">
            Ingresa tu nombre y en seguida te ayudaremos
          </p>
        </div>
        <form name="signin" class="form">
          <div class="input-control">
            <input type="text" name="username" id="username" class="input-field" placeholder="Usuario / Cliente"
              ref="inputField" />
          </div>
          <div class="input-control">
            <button type="button" :class="{
              'input-submit bg-sky-700 text-slate-200': flagModeDark,
              'input-submit bg-sky-600': !flagModeDark
            }" @click="validateTypeUser">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import "@webzlodimir/vue-avatar/dist/style.css";
import eventBus from "@/EventBus";

export default {
  name: "LoginView",
  props: {
    flagModeDark: Boolean
  },
  methods: {
    async validateTypeUser() {
      const getNameUser = this.$refs.inputField.value;

      if (!getNameUser) {
        this.$swal({
          icon: 'info',
          title: 'Ups...',
          text: 'Paro poder ingresar al chat, ingrese su nombre de cliente',
          confirmButtonText: 'Aceptar',
          allowOutsideClick: false,
          allowEscapeKey: false
        })
      } else {
        if (getNameUser == "Soporte") {
          const { value: password } = await this.$swal({
            title: 'Ingrese su contraseña',
            input: 'password',
            inputLabel: 'Password',
            inputPlaceholder: 'Ingrese su contraseña',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Continuar',
            allowOutsideClick: false,
            allowEscapeKey: false,
            inputAttributes: {
              maxlength: 8,
              autocapitalize: 'off',
              autocorrect: 'off'
            },
            inputValidator: (value) => {
              return new Promise((resolve) => {
                if (value) {
                  resolve()
                } else {
                  resolve('Ingrese su contraseña')
                }
              })
            }
          })

          if (password) {
            if (`${password}` == 'Fdh@416q') {
              eventBus.flagLoginActive = false;
              eventBus.flagIsAdmin = true;
              eventBus.infoClient = this.$refs.inputField.value;
            } else {
              this.$swal({
                icon: 'error',
                title: 'Ups...',
                text: 'Contraseña incorrecta',
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonText: 'Intentar de nuevo'
              })
            }
          }
        } else {
          let auxLoginClientId = -1;

          switch (getNameUser) {
            case 'Diego O':
              auxLoginClientId = 1;
              break;
            case 'Pedro Naranjo':
              auxLoginClientId = 0;
              break;
          }

          eventBus.flagLoginClientId = auxLoginClientId;
          eventBus.flagLoginActive = false;
          eventBus.flagIsAdmin = false;
          eventBus.infoClient = this.$refs.inputField.value;
        }
      }
    }
  },
};
</script>

<style lang="scss">
:root {
  --color-white: #ffffff;
  --color-light: #f1f5f9;
  --color-black: #121212;
  --color-night: #001632;

  --color-red: #f44336;
  --color-blue: #1a73e8;
  --color-gray: #80868b;
  --color-grayish: #dadce0;

  --shadow-normal: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-medium: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-large: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: inherit;
  list-style: none;
  list-style-type: none;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

// Components
.containerInMain {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 80rem;
  width: 100%;
  margin: 0 auto;
}

.text {
  font-family: inherit;
  line-height: inherit;
  text-transform: unset;
  text-rendering: optimizeLegibility;

  &-large {
    font-size: 2rem;
    font-weight: 600;
    color: var(--color-black);
  }

  &-normal {
    font-size: 1rem;
    font-weight: 400;
    color: var(--color-black);
  }

  &-links {
    font-size: 1rem;
    font-weight: 400;
    color: var(--color-blue);

    &:hover {
      text-decoration: underline;
    }
  }
}

// Main
.main {
  .wrapper {
    max-width: 28rem;
    width: 100%;
    padding: 2rem 2.5rem;
    border: none;
    outline: none;
    border-radius: 0.25rem;
    box-shadow: var(--shadow-large);

    .form {
      width: 100%;
      height: auto;
      margin-top: 2rem;

      .input-control {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.25rem;
      }

      .input-field {
        font-family: inherit;
        font-size: 1rem;
        font-weight: 400;
        line-height: inherit;
        width: 100%;
        height: auto;
        padding: 0.75rem 1.25rem;
        border: none;
        outline: none;
        border-radius: 2rem;
        color: var(--color-black);
        background: var(--color-light);
        text-transform: unset;
        text-rendering: optimizeLegibility;
      }

      .input-submit {
        font-family: inherit;
        font-size: 1rem;
        font-weight: 500;
        line-height: inherit;
        cursor: pointer;
        min-width: 100%;
        height: auto;
        padding: 0.65rem 1.25rem;
        border: none;
        outline: none;
        border-radius: 2rem;
        color: var(--color-white);
        box-shadow: var(--shadow-medium);
        text-transform: capitalize;
        text-rendering: optimizeLegibility;
      }
    }

    .striped {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin: 1rem 0;

      &-line {
        flex: auto;
        flex-basis: auto;
        border: none;
        outline: none;
        height: 2px;
        background: var(--color-grayish);
      }

      &-text {
        font-family: inherit;
        font-size: 1rem;
        font-weight: 500;
        line-height: inherit;
        margin: 0 1rem;
      }
    }

    .method {
      &-control {
        margin-bottom: 1rem;
      }

      &-action {
        font-family: inherit;
        font-size: 0.95rem;
        font-weight: 500;
        line-height: inherit;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: auto;
        padding: 0.35rem 1.25rem;
        outline: none;
        border: 2px solid var(--color-grayish);
        border-radius: 2rem;
        color: var(--color-black);
        background: var(--color-white);
        text-transform: capitalize;
        text-rendering: optimizeLegibility;
        transition: all 0.35s ease;

        &:hover {
          background: var(--color-light);
        }
      }
    }
  }
}

p {
  line-height: 1rem;
}

@keyframes errorShake {
  0% {
    transform: translateX(-25px);
  }

  25% {
    transform: translateX(25px);
  }

  50% {
    transform: translateX(-25px);
  }

  75% {
    transform: translateX(25px);
  }

  100% {
    transform: translateX(0);
  }
}
</style>
