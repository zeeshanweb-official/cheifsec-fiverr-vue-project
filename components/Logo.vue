<template>
  <div>
    <div class="logo">
        <div class="img-wrap">
            <div class="logo-img">
                <img src="~assets/icon2.svg" />
                <div class="logo-img__text">
                    <p class="logo-img__title">BEVEILIG.NU</p>
                    <p class="logo-img__subtitle">BEVEILIGERSPLATFORM</p>
                    <div class="logo_under"></div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.logo{
  margin:32px auto 24px auto;
  max-width: 220px;
  width: 100%;
  height: 60px;
  display: flex;
  text-decoration:none;
  color:white;
}
.logo-img{
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo-img img{
  width:58px;
}
.logo-img__text{
  margin: 4px 0px 0px 4px;
  line-height: 4px;
}
.logo-img__title {
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 22px;
  letter-spacing: 1.1px;
}
.logo-img__subtitle {
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 12px;
  margin-bottom: 6px;
  letter-spacing: 0.4px;
}
.logo_under {
  background: white;
  height: 3px;
}
</style>
