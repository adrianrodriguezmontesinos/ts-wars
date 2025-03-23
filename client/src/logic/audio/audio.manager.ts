import { AudioType } from '../../models';

export class AudioManager {
  private static instance: AudioManager;
  private _music: HTMLAudioElement;
  private _effects: Map<string, HTMLAudioElement>;
  private _isMuted: boolean;

  /**
   * Manage the game audio
   */
  private constructor() {
    this._isMuted = false;
    this._effects = new Map();

    this._initMusic();
    this._initAudios();
    this._initAudioListener();
  }

  /**
   * Get an unique instance of the AudioManager (singleton pattern).
   * Avoiding to get more than one instance of this class.
   * https://refactoring.guru/es/design-patterns/singleton
   * @returns AudioManager instance
   */
  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  /**
   * Play the game music
   */
  public playdMusic() {
    if (this._music) {
      this._music.pause();
    }

    this._music.play();
  }

  /**
   * Mute/unmute all the audios
   * @param mute True if we want to mute the audios (by deault). False otehrwise.
   */
  public muteUnmuteAll(mute = true) {
    this._isMuted = mute;
    this._music.volume = mute ? 0 : 1;
    this._effects.forEach((effect: HTMLAudioElement) => (effect.volume = mute ? 0 : 1));
  }

  /**
   * Listen the audio events
   */
  private _initAudioListener() {
    document.addEventListener('playAudio', (e: Event) => {
        const customEvent = e as CustomEvent;

        for(const [key, audio] of this._effects) {
            if(key === customEvent.detail) {
                audio.play();
            }
        }
     });
  }

  /**
   * Init the audio effects
   */
  private _initAudios() {
    this._initAduioEffect(AudioType.BUILD, './../../../public/audios/build.ogg');
    this._initAduioEffect(AudioType.CLICK, './../../../public/audios/click.ogg');
    this._initAduioEffect(AudioType.UPGRADE, './../../../public/audios/upgrade.ogg');
  }

  /**
   * Init a single audio effect
   * @param key AudioType 
   * @param src Audio source
   */
  private _initAduioEffect(key: AudioType, src: string) {
    const effect = new Audio(src);
    effect.volume = this._isMuted ? 0 : 1;
    this._effects.set(key, effect);
  }

  /**
   * Init the game music
   */
  private _initMusic() {
    this._music = new Audio('./../../../public/music/town.mp3');
    this._music.loop = true;
    this._music.volume = this._isMuted ? 0 : 1;
  }
}
