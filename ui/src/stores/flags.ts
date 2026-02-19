import { requestFeatureFlags } from "@/services/featureFlagService";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useFlagStore = defineStore("flags", () => {
    const aiCircuitGenerator = ref(false)

    const setFlags = (flags: { aiCircuitGenerator: boolean }) => {
        aiCircuitGenerator.value = flags.aiCircuitGenerator
    }

    const loadFlags = async () => {
        const response = await requestFeatureFlags()
        setFlags(response)
    }
    
    return { aiCircuitGenerator, setFlags, loadFlags }
})