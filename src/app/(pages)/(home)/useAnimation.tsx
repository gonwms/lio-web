// useAnimations.js

import { useLayoutEffect, RefObject, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useAnimation = (scope: RefObject<any>) => {
  //

  useLayoutEffect(() => {
    const q = gsap.utils.selector(scope)
    //   SECTION 1 -------------------------------------------------------------------

    let ctx = gsap.context((self) => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.anim-section2',
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play complete none reverse', // onEnter / onLeave / onEnterBack / onLeaveBack  || play, pause, resume, , restart, complete, reverse, none.
            markers: false,
            scrub: 2,
            // pin: true,
          },
        })
        .from(q('.anim-section2 h2'), { autoAlpha: 0, x: 400 })
      //   SECTION 2 -------------------------------------------------------------------

      // END ANIMATIONS
    }, scope)
    return () => ctx.revert()
  }, [scope])

  return
}
