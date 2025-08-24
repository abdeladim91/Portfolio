gsap.fromTo('#portrait', {y:100, opacity: 0}, {y:0, rotation:0, opacity: 1, duration:2});
gsap.fromTo('.margin-inline', {x:100, opacity: 0}, {x:0, rotation:0, opacity: 1, duration:2});
gsap.fromTo('.text1', {x:-100, opacity: 0}, {x:0, rotation:0, opacity: 1, duration:1, scrollTrigger: {
  trigger: '.text1',start: 'top 50%'}});
gsap.fromTo('.text2', {y:-100, opacity: 0}, {y:0, rotation:0, opacity: 1, duration:1, scrollTrigger: {
  trigger: '.text2',start: 'top 50%'}});