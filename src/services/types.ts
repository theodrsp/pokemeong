export interface Stat {
    base_stat: number;
    stat: {
      name: string;
    };
  }
  
  export interface Pokemon {
    id: number;
    name: string;
    stats: Stat[];
    sprites: {
      other: {
        'official-artwork': {
          front_default: string;
        };
      };
    };
  }
  