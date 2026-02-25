import { getUserInfo } from "@/services/userInfoService";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
    const logged = ref(false)
    const login = ref("")
    const github = ref("")
    const username = ref("")
    const avatarUrl = ref("")
    const gists = ref([])

    const loadProfile = async () => {
        try {
            const response = await getUserInfo()
            login.value = response.login;
            username.value = response.name;
            github.value = response.html_url;
            avatarUrl.value = response.avatar_url;
            logged.value = true;

        } catch (error) {
            console.log(error)
            logged.value = false
        }
    }
    
    return { logged, login, github, username, avatarurl: avatarUrl, gists, loadProfile }
}, { persist: true })