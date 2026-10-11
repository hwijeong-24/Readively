import React from 'react';

interface StoryIllustrationProps {
  illustrationId: string;
  className?: string;
  alt?: string;
}

const IMAGE_MAP: Record<string, string> = {
  cover: '/src/assets/images/cover_max_hero_1791725253552.jpg',
  page_1: '/src/assets/images/page_one_garden_1791725274276.jpg',
  page_2: '/src/assets/images/page_two_cat_gate_1791725295265.jpg',
  page_3: '/src/assets/images/page_three_red_ball_1791725306167.jpg',
  page_4: '/src/assets/images/page_three_red_ball_1791725306167.jpg',
  page_5: '/src/assets/images/page_six_bench_bike_1791725316383.jpg',
  page_6: '/src/assets/images/page_six_bench_bike_1791725316383.jpg',
  page_7: '/src/assets/images/page_seven_baby_bird_1791725327003.jpg',
  page_8: '/src/assets/images/page_seven_baby_bird_1791725327003.jpg',
  page_9: '/src/assets/images/page_ten_victory_hug_1791725360835.jpg',
  page_10: '/src/assets/images/page_ten_victory_hug_1791725360835.jpg',
};

export const StoryIllustration: React.FC<StoryIllustrationProps> = ({
  illustrationId,
  className = 'w-full h-full object-cover',
  alt = "Max the Brave Dog illustration",
}) => {
  const imgSrc = IMAGE_MAP[illustrationId] || IMAGE_MAP.page_1;

  return (
    <img
      src={imgSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      className={className}
      loading="eager"
    />
  );
};
