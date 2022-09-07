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
        if(this.musicIndex == this.musicList.length)
        {
            this.musicIndex = 0;
            return;
        }
           
    }

    prev(){
        this.musicIndex--;
        if(this.musicIndex == -1)
        {
            this.musicIndex = this.musicList.length - 1;
            return;
        }
    }
}