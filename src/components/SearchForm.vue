<template>
    <div>
        <form novalidate>
            <b-form-input type="text" placeholder="Search movies" v-model="inputFormValue" minlength="3"></b-form-input>
            <div class="invalid-feedback">
                Type at least 3 characters
            </div>
            <button @click.prevent="setSearchValue">Search</button>
        </form>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class SearchForm extends Vue {
    private inputFormValue = '';

    get searchValue(): string {
      return this.$store.state.searchValue;
    }

    private setSearchValue() {
      this.$store.commit('updateSearchValue', this.inputFormValue);
    }
}
</script>
