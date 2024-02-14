import { useState } from 'react';
import AvatarConstants from '../constants/avatar.constants';

function getRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const getBody = (gender) => getRandom(AvatarConstants.BODY[gender] ?? AvatarConstants.BODY.DEFAULT);
const getFacialHair = (gender) =>
  getRandom(AvatarConstants.FACIAL_HAIR[gender] ?? AvatarConstants.FACIAL_HAIR.DEFAULT);
const getMouth = (gender) =>
  getRandom(AvatarConstants.MOUTH[gender] ?? AvatarConstants.MOUTH.DEFAULT);
const getHair = (gender) => getRandom(AvatarConstants.HAIR[gender] ?? AvatarConstants.HAIR.DEFAULT);

export default function useAvatar({ initialValues }) {
  const [values, setValues] = useState(initialValues || {});

  const generateAvatar = async (department, gender) => {
    setValues({
      ...values,
      skinTone: getRandom(['light', 'yellow', 'brown', 'dark', 'red', 'black']),
      eyes: getRandom([
        'normal',
        'leftTwitch',
        'happy',
        'content',
        'squint',
        'simple',
        'dizzy',
        'wink',
        'heart',
      ]),
      eyebrows: getRandom(['raised', 'leftLowered', 'serious', 'angry', 'concerned']),
      mouth: getMouth(gender),
      hair: getHair(gender),
      facialHair: getFacialHair(gender),
      clothing: getRandom(['shirt', 'dressShirt', 'vneck', 'tankTop']),
      accessory: getRandom(['none', 'roundGlasses', 'tinyGlasses', 'shades']),
      graphic: department || 'none',
      hat: getRandom(['none', 'none2', 'none3', 'none4', 'none5', 'beanie', 'turban']),
      body: getBody(gender),
      hairColor: getRandom(['blonde', 'orange', 'black', 'white', 'brown', 'blue', 'pink']),
      clothingColor: getRandom(['white', 'blue', 'black', 'green', 'red']),
      circleColor: getRandom(['blue']),
      lipColor: getRandom(['red', 'purple', 'pink', 'turqoise', 'green']),
      hatColor: getRandom(['white', 'blue', 'black', 'green', 'red']),
      faceMaskColor: getRandom(['white', 'blue', 'black', 'green', 'red']),
      mask: true,
      faceMask: false,
      lashes: getRandom(['true', 'false']),
    });
  };

  const changeDepartment = async (department) => {
    setValues({
      ...values,
      graphic: department,
    });
  };

  return {
    generateAvatar,
    changeDepartment,
    values,
  };
}
