<template>
    <div>
        <b-form @submit="formValidation" :validated="validated" class="was-walidated" novalidate>
            <b-form-input type="text" placeholder="Search movies" v-model="inputFormValue" minlength="3" :state="inputValidation" required></b-form-input>
            <div class="invalid-feedback">
                Type at least 3 characters
            </div>
            <b-button type="submit">Search</b-button>
        </b-form>
    </div>
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
      if (this.inputFormValue.length >= 3) {
        this.setSearchValue();
      }
    }
}
</script>
