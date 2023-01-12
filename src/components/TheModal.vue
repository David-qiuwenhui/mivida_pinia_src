<template>
    <Teleport to="body">
        <div class="model">
            <div class="backdrop"></div>
            <div class="modalContent">
                <button class="closeButton" @click="$emit('close')">
                    <svg
                        t="1665152457792"
                        class="icon"
                        viewBox="0 0 1045 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="2543"
                        width="48"
                        height="48"
                    >
                        <path
                            d="M282.517333 213.376l-45.354666 45.162667L489.472 512 237.162667 765.461333l45.354666 45.162667L534.613333 557.354667l252.096 253.269333 45.354667-45.162667-252.288-253.44 252.288-253.482666-45.354667-45.162667L534.613333 466.624l-252.096-253.226667z"
                            p-id="2544"
                        ></path>
                    </svg>
                </button>
                <slot></slot>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
defineEmits(["close"]);
</script>

<style scoped>
.model {
    position: fixed;
    width: 100vw;
    height: 100vh;
    max-width: 100%;
    left: 0;
    top: 0;
    display: grid;
    place-items: center;
}

.backdrop {
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
}

.modalContent {
    border-radius: 52px;
    position: relative;
    background: white;
    overflow: hidden;
}

.closeButton {
    position: absolute;
    background: none;
    border: none;
    right: 20px;
    top: 20px;
}
</style>
