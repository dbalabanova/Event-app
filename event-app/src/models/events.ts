export type Event = {
  name: string;
  id: string;
  images: Image[];

  dates: {
    start: {
      localDate: string;
      localTime:string;
    };
  };
  classifications: [
    {
      segment: {
        name: string;
      };
    }
  ];
  priceRanges:[{
    min:number
  }]
}

export type Image = {
  ratio?: string;
  url: string;
  width?: number;
  height?: number;
  fallback?: boolean;
}


export type UserEvent = {
  title:string
  imgLink:string
  genre:string
  date: string
  hour:string
  price:number
  id:string
}

export type SearchKeys = 'keyword' | 'segmentName' | ''


