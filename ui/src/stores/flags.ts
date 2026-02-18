import { defineStore } from "pinia";
import { ref } from "vue";

export const flagsStore = defineStore("flags", () => {
    const aiCircuitGenerator = ref(false)

    function setFlags(flags: { aiCircuitGenerator: boolean }) {
        aiCircuitGenerator.value = flags.aiCircuitGenerator
    }

    
    return { aiCircuitGenerator, setFlags }
})