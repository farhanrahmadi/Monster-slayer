new Vue({
	el: '#app',
	data: {
		playerName: 'YOU',
		playerHealth: 100,
		monsterHealth: 100,
		gamePlaying: false,
		turns: [],
		energy: 30
	},
	methods: {
		gameStart: function(){
			alert('I choose you pikachu');
			this.gamePlaying 	= true;
			this.playerHealth 	= 100;
			this.monsterHealth 	= 100;
			this.playerName 	= 'PIKACHU'
			this.energy 		= 30; 

		},
		attack: function(){
			let damage 	= this.generateDamage(0,10);
			this.monsterHealth -= damage;
			if (this.monsterHealth <= 0) {
				alert('You Wont');
				this.gamePlaying = false;
				if(confirm('Want play again ?')){
					this.gameStart();
				}
				return;
			}
			this.monsterAttack(5,12);
			this.battleTurn(damage,'player','dealth damage');
		},		
		monsterAttack: function(min,max){
			let damage 	= this.generateDamage(min,max);
			this.playerHealth	-=	damage;

			if (this.playerHealth <= 0) {
				this.playerName = 'X.X';
				alert('You lost!');
				this.gamePlaying = false;
				if(confirm('Want play again ?')){
					this.gameStart();
				}
				return;
			}
			this.battleTurn(damage,'monster','dealth damage');
		},
		generateDamage: function(min, max){
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},
		specialAttack: function(){
			if (this.energy >= 16 ) {
				this.energy -= 16
				let damage 	= this.generateDamage(25,50);
				this.monsterHealth -= damage;
				if (this.monsterHealth <= 0) {
					alert('You Wont');
					this.gamePlaying = false;
					if(confirm('Want play again ?')){
						this.gameStart();
					}
					return;
					
				}
				this.battleTurn(damage,'player','dealth and stun monster damage ');
			} else {
				this.battleTurn('','','You run out of energy!, Look out monster attack');
				this.monsterAttack(20,50);
			}
		},
		heal: function(){
			if (this.energy >= 3 ) {
				if (this.playerHealth <= 90) {
					this.energy -= 4
					let heal = Math.floor(Math.random() * (15 - 4 + 1)) + 4;
					this.playerHealth += heal;
					this.battleTurn(heal,'player','heals himself');
					this.monsterAttack(2,8);
				} else {
					this.battleTurn('','','Your health is full enough you chicken');
				}
			} else {
				this.battleTurn('','','You run out of energy!, Look out monster attack');
				this.monsterAttack(20,50);
			}
		},
		giveUp: function(){
			this.battleTurn('','','You ran from battle');
			this.gamePlaying = false;
			this.playerName = 'X.X';
		},
		battleTurn: function(damage,actor,text){
			
			let isPlayer;
			let crit;
			if (actor == 'player') {
				isPlayer = true;
			} else {
				isPlayer = false;
			};
			if (damage >= 40) {
				crit = "critical";
			}else{
				crit = "";
			}
			battleLog = actor+crit+" "+text+" "+damage;
			this.turns.unshift({
				isPlayer,battleLog
			});
		}
	}
});