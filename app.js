const app = Vue.createApp({
  data() {
    return {
      battleLog: [],
      playerHealth: 100,
      monsterHealth: 100,
      specialAttackCount: 0,
      healCount: 0,
      playable: true,
      message: "",
    };
  },

  computed: {
    playerHealthValue() {
      if (this.playerHealth <= 0) {
        return { width: "0%" };
      } else return { width: this.playerHealth + "%" };
    },
    monsterHealthValue() {
      if (this.monsterHealth <= 0) {
        return { width: "0%" };
      } else return { width: this.monsterHealth + "%" };
    },
  },

  methods: {
    getRandomValue(min, max) {
      return Math.floor(Math.random() * max) + min;
    },
    attack() {
      //create attack dmg for both monster and player (from 1 -> 9 DMG)
      const playerAttackDMG = this.getRandomValue(1, 9);
      const monsterAttackDMG = this.getRandomValue(1, 9);

      //reference attack dmg point to the data to change healthbar value;
      this.playerHealth = this.playerHealth - monsterAttackDMG;
      this.checkPlayable();

      this.monsterHealth = this.monsterHealth - playerAttackDMG;
      this.checkPlayable();

      //logging the attack history
      const playerLog = "Bạn tấn công và gây ra " + playerAttackDMG + " damage cho Quái Vật";
      this.battleLog.push(playerLog);
      const monsterLog = "Quái Vật tấn công lại và gây ra " + monsterAttackDMG + " damage tới Người Chơi";
      this.battleLog.push(monsterLog);
    },
    specialAttack() {
      this.checkPlayable;

      //create special attack dmg for both monster and player (from 8 -> 27 DMG)
      const playerSpecialATK = this.getRandomValue(8, 20);
      const monsterSpecialATK = this.getRandomValue(8, 20);

      //reference attack dmg point to the data to change healthbar value;
      this.playerHealth = this.playerHealth - monsterSpecialATK;
      this.checkPlayable();
      this.monsterHealth = this.monsterHealth - playerSpecialATK;
      this.checkPlayable();

      //logging the attack history
      const playerLog =
        "Bạn sử dụng CHIÊU ĐẶC BIỆT và gây ra " +
        playerSpecialATK +
        " damage tới Quái Vật";
      this.battleLog.push(playerLog);
      const monsterLog =
        "Quái Vật cũng sử dụng CHIÊU ĐẶC BIỆT và gây ra " +
        monsterSpecialATK +
        " damage tới Người Chơi";
      this.battleLog.push(monsterLog);

      //limit special attack usage time
      this.specialAttackCount++;
    },
    heal() {

      //create heal value for player & monster (from 1 -> 6 health)
      const playerHealPoint = this.getRandomValue(1, 6);
      const monsterHealPoint = this.getRandomValue(1, 6);

      //reference healing point to the data to change healthbar value;
      this.playerHealth = this.playerHealth + playerHealPoint;
      this.monsterHealth = this.monsterHealth + monsterHealPoint;

      //logging the healing history
      const playerLog = "Người Chơi hồi lại " + playerHealPoint + " máu";
      const monsterLog = "Quái Vật cũng hồi lại " + monsterHealPoint + " máu";
      this.battleLog.push(playerLog);
      this.battleLog.push(monsterLog);

      //limit healing usage time
      this.healCount++;
    },
    surrender() {
        this.playerHealth = 0;
        this.checkPlayable();
    },
    checkPlayable() {
      if (this.playerHealth <= 0) {
        this.playable = false;
        this.message = "BẠN ĐÃ THUA";
    } else if (this.monsterHealth <= 0) {
        this.playable = false;
        this.message = "BẠN ĐÃ THẮNG";
      }
    },
    restartGame() {
      //restart all value to the default;
      this.playable = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.healCount = 0;
      this.specialAttackCount = 0;
      this.message = "";
      this.battleLog = [];
    },
  },
});

app.mount("#game");
