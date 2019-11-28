<template>
  <div class="steps-frame">
    <ul class="steps is-narrow is-medium is-centered has-content-centered">
      <li class="steps-segment is-active has-gaps">
        <router-link to="/ruta" class="has-text-dark">
          <span class="steps-marker">
            <span class="icon">
              <span class="fas fa-map-marker-alt"></span>
            </span>
          </span>
          <div class="steps-content">
            <p class="heading">Ruta</p>
          </div>
        </router-link>
      </li>
      <li class="steps-segment is-active has-gaps">
        <router-link to="/carga" class="has-text-dark">
          <span class="steps-marker">
            <span class="icon has-text-grey">
              <span class="fas fa-truck-loading"></span>
            </span>
          </span>
          <div class="steps-content">
            <p class="heading">Carga</p>
          </div>
        </router-link>
      </li>
      <li class="steps-segment is-active has-gaps">
        <router-link to="/datos" class="has-text-dark">
          <span class="steps-marker">
            <span class="icon has-text-grey">
              <span class="fas fa-user"></span>
            </span>
          </span>
          <div class="steps-content">
            <p class="heading">Mis datos</p>
          </div>
        </router-link>
      </li>
      <li class="steps-segment is-active has-gaps">
        <router-link to="/confirma" class="has-text-dark">
          <span class="steps-marker">
            <span class="icon has-text-grey">
              <span class="fas fa-check"></span>
            </span>
          </span>
          <div class="steps-content">
            <p class="heading">Confirmación</p>
          </div>
        </router-link>
      </li>
      <li class="steps-segment">
        <router-link to="/pago" class="has-text-dark">
          <span class="steps-marker">
            <span class="icon has-text-grey">
              <span class="fas fa-credit-card"></span>
            </span>
          </span>
          <div class="steps-content">
            <p class="heading">Pago</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>