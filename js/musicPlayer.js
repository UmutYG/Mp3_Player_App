class MusicPlayer {
    constructor(musicList)
    {
        this.musicList = musicList;
        this.musicIndex = 0;
    }

    getCurrentMusic() {
        return this.musicList[this.musicIndex];
    }

    next(){
        this.musicIndex++;
    }

    prev(){
        this.musicIndex--;
    }
}