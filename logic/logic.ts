import { MutableRefObject } from "react";

enum periodsInSeconds {
  DAY = 86400,
  HOUR = 3600,
  MINUTE = 60,
}

type timerText = {
  days: string;
  daysColumn: string;
  hours: string;
  hoursColumn: string;
  minutes: string;
  minutesColumn: string;
  seconds: string;
};

const formatTimeUnitString = (unit: number): string => {
  return `${unit.toString().padStart(2, "0")}`;
};

export const getFormattedTexts = (countDown: string): timerText => {
  const days =
    Number(countDown.substring(0, 2)) > 0 ? countDown.substring(0, 2) : "";
  const daysColumn =
    Number(countDown.substring(0, 2)) > 0 ? countDown.substring(2, 3) : "";
  const hours =
    Number(countDown.substring(0, 2)) > 0 ||
    Number(countDown.substring(3, 5)) > 0
      ? countDown.substring(3, 5)
      : "";
  const hoursColumn =
    Number(countDown.substring(0, 2)) > 0 ||
    Number(countDown.substring(3, 5)) > 0
      ? countDown.substring(5, 6)
      : "";
  const minutes =
    Number(countDown.substring(0, 2)) > 0 ||
    Number(countDown.substring(3, 5)) > 0 ||
    Number(countDown.substring(6, 8)) > 0
      ? countDown.substring(6, 8)
      : "";
  const minutesColumn =
    Number(countDown.substring(0, 2)) > 0 ||
    Number(countDown.substring(3, 5)) > 0 ||
    Number(countDown.substring(6, 8)) > 0
      ? countDown.substring(8, 9)
      : "";
  const seconds =
    countDown !== `00:00:00:00` ? countDown.substring(9, 11) : "OBRIGADO";

  return {
    days,
    daysColumn,
    hours,
    hoursColumn,
    minutes,
    minutesColumn,
    seconds,
  };
};

export const playSong = (player: MutableRefObject<any>, countDown: string) => {
  if (countDown === `00:00:00:00`) {
    if (player) player.current.play();
  }
};

export const runCountdown = () => {
  const finalDate = new Date("2021-09-10T20:00:00.000Z");
  const initialDate = new Date(`2021-08-13T12:00:00.000Z`).getTime();

  const now = new Date().getTime();
  let dif = Math.floor((finalDate.getTime() - now) / 1000);

  const totalTime = (finalDate.getTime() - initialDate) / 1000;
  const elapsedTime = Math.floor((now - initialDate) / 1000);

  const days = Math.floor(dif / 86400);
  dif = dif % periodsInSeconds.DAY;

  const hours = Math.floor(dif / 3600);
  dif = dif % periodsInSeconds.HOUR;

  const minutes = Math.floor(dif / 60);
  dif = dif % periodsInSeconds.MINUTE;

  const seconds = dif;

  const daysString = formatTimeUnitString(days);
  const hourString = formatTimeUnitString(hours);
  const minutesString = formatTimeUnitString(minutes);
  const secondString = formatTimeUnitString(seconds);

  const countDownText =
    dif >= 0
      ? `${daysString}:${hourString}:${minutesString}:${secondString}`
      : `00:00:00:00`;

  const incrementalSaturation =
    elapsedTime <= totalTime ? (elapsedTime / totalTime) * 100 : 100;

  return {
    countDownText,
    incrementalSaturation,
  };
};
