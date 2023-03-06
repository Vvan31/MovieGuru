const TimeLine = gsap.timeline({
    defaults: {
        duration: 2,
        autoAlpha: 0,
        ease: "power4.out"
    }
})
TimeLine
// .from('.logo', { x: -20 })
.from('.footer-items', { x: -50, stagger: 0.5 })
.from('.title', { y: 20 })
.from('.college', { y: 20 },)
