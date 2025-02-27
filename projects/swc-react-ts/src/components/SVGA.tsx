import {createRef, useEffect} from 'react'
import SVGA from 'svgaplayerweb'
import svgafile from 'src/assets/throw.svga'
const SvgaCase = (): any => {
  const canvasRef = createRef<HTMLDivElement>()
  useEffect(() => {
    if (canvasRef.current !== null) {
      const player = new SVGA.Player(canvasRef.current)
      const parser = new SVGA.Parser()
      parser.load(svgafile, function (videoItem) {
        player.setVideoItem(videoItem)
        player.startAnimation()
      })
    }
  }, [canvasRef])
  //
  return <div ref={canvasRef} style={{height: 360}}></div>
}

export default SvgaCase
