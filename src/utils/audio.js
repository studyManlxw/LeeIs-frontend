import AudioPlayer from '../components/AudioPlayer'
export default {
    install:function(Vue){
        window.audioList=[]
        Vue.component("audioPlayer",AudioPlayer);
    }
}
