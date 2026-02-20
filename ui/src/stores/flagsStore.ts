import { requestFeatureFlags } from "@/services/featureFlagService";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useFlagsStore = defineStore("flags", () => {
    const aiCircuitGenerator = ref(false)

    const setFlags = (flags: { aiCircuitGenerator: boolean }) => {
        aiCircuitGenerator.value = flags.aiCircuitGenerator
    }

    const loadFlags = async () => {
        try {
            const response = await requestFeatureFlags()
            setFlags(response)
        } catch (error) {
            console.log(error)
            setFlags({
                aiCircuitGenerator: false
            })
        }
    }
    
    return { aiCircuitGenerator, setFlags, loadFlags }
})