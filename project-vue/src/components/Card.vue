<template>
  <div class="item">
    <div class="image-contianer">
      <slot name="image"></slot>
    </div>
    <div class="details">
      <h3>
        <slot name="heading"></slot>
      </h3>
      <span>
        <slot name="origin"></slot>
      </span>
      <span>
        <slot name="status"></slot>
      </span>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
  min-width: 100%;
  width: 80%;
  height: 450px;
  padding: 10px 0px;
}
h3{
  padding: 0px 10px;
}
span {
  display: block;
  font-size: 18px;
  color: #fff;
  padding: 0px 10px;
}

.item .image-contianer{
  width: 100%;
  min-width: 100%;
  overflow: hidden;
}


.details {
  background-color: rgb(99, 96, 96);
}


h3 {
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-heading);
}

@media (min-width: 768px) {
  .item{
    padding: 10px;
  }
}
@media (min-width: 1024px) {}
</style>
