import styles from '@styles/index.module.scss'
import { useEffect, useRef, useState } from 'react';

export default function Home() {

  const runCountdown = (date: Date) => {
    const initialDate = new Date(`2021-08-13T12:00:00.000Z`).getTime();
    const now = new Date().getTime();
    var dif = Math.floor((date.getTime() - now) / 1000);
    const totalTime = (finalDate.getTime() - initialDate) / 1000;
    const elapsedTime = Math.floor((now - initialDate) / 1000);
    const days = Math.floor(dif / 86400);
    dif = dif % 86400;
    const hours = Math.floor(dif / 3600);
    dif = dif % 3600;
    const minutes = Math.floor(dif / 60);
    dif = dif % 60;
    const seconds = dif;
    const countDownText = dif >= 0 ? `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}` : `00:00:00:00`
    const incrementalSaturation = elapsedTime <= totalTime ? ((elapsedTime / totalTime) * 100) : 0;

    console.log(elapsedTime)
    console.log(totalTime)

    return {
              countDownText,
              incrementalSaturation
           }
  }

  const finalDate = new Date('2021-09-10T20:00:00.000Z')
  //const finalDate = new Date('2021-08-18T20:00:00.000Z')
  const { countDownText, incrementalSaturation } = runCountdown(finalDate);
  const [countDown, setCountDown] = useState(countDownText);
  const [saturation, setSaturation] = useState(incrementalSaturation);
  const audioPlayer = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      const { countDownText, incrementalSaturation } = runCountdown(finalDate);
      setCountDown(countDownText)
      console.log(saturation)
      setSaturation(incrementalSaturation)
      if (countDownText === `00:00:00:00`) {
        if(audioPlayer) audioPlayer.current.play();
      }
    }, 1000)
  })

  return <main className={styles.canvas}>
            <div className={styles.container}>
              <div className={styles['countdown-info']}>
                <p>{Number(countDown.substring(0, 2)) > 0 ? countDown.substring(0, 2) : ''}</p>
                <p className={styles.dots}>{Number(countDown.substring(0, 2)) > 0 ? countDown.substring(2, 3) : ''}</p>
                <p>{Number(countDown.substring(0, 2)) > 0 || Number(countDown.substring(3, 5)) > 0 ? countDown.substring(3, 5) : ''}</p>
                <p className={styles.dots}>{Number(countDown.substring(0, 2)) > 0 || Number(countDown.substring(3, 5)) > 0 ? countDown.substring(5, 6): ''}</p>
                <p>{Number(countDown.substring(0, 2)) > 0 || Number(countDown.substring(3, 5)) > 0 || Number(countDown.substring(6, 8)) > 0 ? countDown.substring(6, 8) : ''}</p>
                <p className={styles.dots}>{Number(countDown.substring(0, 2)) > 0 || Number(countDown.substring(3, 5)) > 0 || Number(countDown.substring(6, 8)) > 0 ? countDown.substring(8, 9) : ''}</p>
                <p>{countDown !== `00:00:00:00` ? countDown.substring(9, 11) : "OBRIGADO"}</p>
              </div>
                <div className={styles.names}>
                  <ul>
                    <li>Alef Fernandes</li>
                    <li>Jairo Júnior</li>
                    <li>José Antônio</li>
                  </ul>
                </div>
            </div>

           <div className={styles['photo-grid']}>
              <div className={styles.layers}>
                <img className={styles.backphoto} src="images/photo.png" alt="" />
                <img style={{ opacity: `${saturation}%` }} className={styles.jairo} src="images/jairo.png" alt="" />
                <img style={{ opacity: `${saturation}%` }} className={styles.ze} src="images/ze.png" alt="" />
              </div>

              <div className={styles.layers}>
                <img className={styles.backphoto2} src="images/photo2.png" alt="" />
                <img style={{ opacity: `${saturation}%` }} className={styles.alef} src="images/alef.png" alt="" />
              </div>
            </div>
            <audio src="assets/Mariarita.mp3" id="my_audio" loop={true} ref={audioPlayer}></audio>
        </main>;
}
