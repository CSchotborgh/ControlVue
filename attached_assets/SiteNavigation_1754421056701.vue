<template>
    <RouterLink :to="{ name: 'home' }">
    </RouterLink>
    <fwb-navbar>
        <template #logo>
            <fwb-navbar-logo alt="ECX Logo" image-url="/images/ecx_logo.png" link="#">
                EDGERACK
            </fwb-navbar-logo>
        </template>
        <template #default="{isShowMenu}">
            <fwb-navbar-collapse :is-show-menu="isShowMenu">
                <!-- Home Link -->
                <fwb-navbar-link>
                    <RouterLink :to="{ name: 'home' }">
                    Home
                    </RouterLink>
                </fwb-navbar-link>
                <!-- Grid Link -->
                <fwb-navbar-link >
                    <RouterLink :to="{ name: 'rcu' }">
                    RCU View
                    </RouterLink>
                </fwb-navbar-link>
                <fwb-navbar-link >
                    Log In
                </fwb-navbar-link>

            </fwb-navbar-collapse>
        </template>
    </fwb-navbar>
  </template>
  
<script setup>
  import {
    FwbAvatar,
    FwbDropdown,
    FwbNavbar,
    FwbNavbarCollapse,
    FwbNavbarLink,
    FwbNavbarLogo,
  } from 'flowbite-vue';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';

let activePage = 0;
let activeHome = true;
let activeGrid = false;

const updateActiveHome = () => {
    return activePage === 0;
}

const updateActiveGrid = () => {
    return activePage === 1;
}

const changeToHome = () => {
    activeHome = true;
    activeGrid = false;
    console.log("Activated change to Home!")
}

const changeToGrid = () => {
    activeHome = false;
    activeGrid = true;
    console.log("Activated change to Grid!")
}


</script>