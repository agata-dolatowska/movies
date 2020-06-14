<template>
  <b-row class="justify-content-lg-center">
    <b-col lg="6">
      <b-form @submit.prevent="formValidation" :validated="validated" class="was-walidated mt-3 mb-3" novalidate >
        <b-input-group>
          <b-form-input type="text" placeholder="Search movies" v-model="inputFormValue" minlength="3" :state="inputValidation" required></b-form-input>
          <b-input-group-append>
            <b-button type="submit">Search</b-button>
          </b-input-group-append>
          <div class="invalid-feedback">
            Type at least 3 characters
          </div>
        </b-input-group>
      </b-form>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class SearchForm extends Vue {
    private inputFormValue = '';

    validated = false;

    inputValidation: boolean | null = null;

    get searchValue(): string {
      return this.$store.state.searchValue;
    }

    private setSearchValue() {
      this.$store.commit('updateSearchValue', this.inputFormValue);
    }

    formValidation() {
      this.validated = true;
      this.inputValidation = true;
      if (this.$router.currentRoute.path !== '/') {
        this.$router.push('/');
      }
      if (this.inputFormValue.length >= 3) {
        this.setSearchValue();
      }
    }
}
</script>
