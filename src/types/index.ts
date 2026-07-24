export interface DogImage {
  id: string;
  url: string;
  width?: number;
  height?: number;
}

export interface WeightHeight {
  imperial: string;
  metric: string;
}

export interface Breed {
  id: number;
  name: string;
  bred_for?: string;
  breed_group?: string;
  life_span?: string;
  temperament?: string;
  origin?: string;
  reference_image_id?: string;
  weight: WeightHeight;
  height: WeightHeight;
  image?: DogImage;
}
