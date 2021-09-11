import styles from '@styles/index.module.scss'
import { useEffect, useRef, useState } from 'react';
import { runCountdown, getFormattedTexts, playSong } from '../logic/logic';
import { Layout } from './layout';

export default function Home() {
  const { countDownText, incrementalSaturation } = runCountdown();
  const [saturation, setSaturation] = useState(incrementalSaturation);
  const [formattedTexts, setFormattedTexts ] = useState(getFormattedTexts(countDownText));
  const audioPlayer = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      const { countDownText, incrementalSaturation } = runCountdown();
      setSaturation(incrementalSaturation)
      setFormattedTexts(getFormattedTexts(countDownText))
      playSong(audioPlayer, countDownText);
    }, 1000)
  })

  return <Layout>
            <main className={styles.canvas}>
                <div className={styles.container}>
                  <div className={styles['countdown-info']}>
                    <p>{formattedTexts.days}</p>
                    <p className={styles.dots}>{formattedTexts.daysColumn}</p>
                    <p>{formattedTexts.hours}</p>
                    <p className={styles.dots}>{formattedTexts.hoursColumn}</p>
                    <p>{formattedTexts.minutes}</p>
                    <p className={styles.dots}>{formattedTexts.minutesColumn}</p>
                    <p>{formattedTexts.seconds}</p>
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
            </main>
        </Layout>;
}
