import styles from '@styles/index.module.scss'
import { useEffect, useState } from 'react';

export default function Home() {

  const runCountdown = (date: Date) => {
    const initialDate = new Date(`2021-08-13T12:00:00.000Z`).getTime();
    const now = new Date().getTime();
    var dif = Math.round((date.getTime() - now) / 1000);
    const totalTime = dif;
    const elapsedTime = Math.round((now - initialDate) / 1000);
    const days = Math.round(dif / 86400);
    dif = dif % 86400;
    const hours = Math.round(dif / 3600);
    dif = dif % 3600;
    const minutes = Math.round(dif / 60);
    dif = dif % 60;
    const seconds = dif;
    const countDownText = `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    const incrementalSaturation = 100 - ((elapsedTime / totalTime) * 100);

    return {
              countDownText,
              incrementalSaturation
           }
  }

  const finalDate = new Date('2021-09-03T20:00:00.000Z')
  const { countDownText, incrementalSaturation } = runCountdown(finalDate);
  const [countDown, setCountDown] = useState(countDownText);
  const [saturation, setSaturation] = useState(incrementalSaturation);

  useEffect(() => {
    setTimeout(() => {
      const { countDownText, incrementalSaturation } = runCountdown(finalDate);
      setCountDown(countDownText)
      setSaturation(incrementalSaturation)
    }, 1000)
  })

  return <main className={styles.canvas}>
            <div className={styles.container}>
               <p className={styles['countdown-info']}>{countDown}</p>
                <div className={styles.names}>
                  <ul>
                    <li>Alef Fernandes</li>
                    <li>Jairo Júnior</li>
                    <li>José Antônio</li>
                  </ul>
                </div>
            </div>
            <div className={styles.photo}>
              <div className={styles.layers}>
                <img className={styles.backphoto} src="images/photo.png" alt="" />
                <img style={{ filter: `saturate(${saturation}%)` }} className={styles.jairo} src="images/jairo.png" alt="" />
                <img style={{ filter: `saturate(${saturation}%)` }} className={styles.ze} src="images/ze.png" alt="" />
              </div>
            </div>
        </main>;
}
