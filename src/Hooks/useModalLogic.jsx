import { useState, useEffect } from 'react'

const useModalLogic = (modalRef) => {
  const [isShowModalBox, setIsShowModalBox] = useState(false)
  const [coordClick, setCoordClick] = useState({})

  useEffect(() => {

    const modalNotifRef = document.querySelector(modalRef)

    if (isShowModalBox) {
      modalNotifRef.classList.remove("modal-hide")
      modalNotifRef.classList.add("modal-show")
    } else {
      modalNotifRef.classList.remove("modal-show")
      modalNotifRef.classList.add("modal-hide")
      coordClick.length && setCoordClick({})
    }

    const clickHandlerOutModal = event => {
      let eventX = event.x
      let eventY = event.y
      if (modalNotifRef.classList.contains('modal-show') && isShowModalBox && coordClick.x !== eventX && coordClick.y !== eventY) {
        const modalCoordinates = modalNotifRef.getBoundingClientRect()
        if (eventX < modalCoordinates.left || eventX > modalCoordinates.right || eventY < modalCoordinates.top || eventY > modalCoordinates.bottom) {
          setIsShowModalBox(false)
          setCoordClick({})
        }
      }
    }

    window.addEventListener('click', clickHandlerOutModal)
    return () => window.removeEventListener('click', clickHandlerOutModal)

  }, [isShowModalBox, coordClick, modalRef])

  const clickHandlerNotif = e => {
    setCoordClick({ x: e.pageX, y: e.pageY })
    setIsShowModalBox(prev => !prev)
  }

  return clickHandlerNotif

}

export default useModalLogic
