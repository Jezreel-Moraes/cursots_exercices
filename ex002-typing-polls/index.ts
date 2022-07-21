type VoteOption = { name: string; numberOfVotes: number };
type VoteOptionDict = { [k: string]: VoteOption };

export class Voting {
  private readonly _voteOptions: VoteOptionDict = {};
  private readonly listNames: string[] = [];
  constructor(public details: string) {}

  addOption(...optionsName: string[]): this {
    for (const option of optionsName) {
      const lowerOption = option.toLowerCase();
      if (this.listNames.indexOf(lowerOption) === -1) this.listNames.push(lowerOption);
      const voteOption: VoteOption = { name: option, numberOfVotes: 0 };
      this._voteOptions[lowerOption] = voteOption;
    }
    return this;
  }

  vote(option: string | number): void {
    if (typeof option === 'number') option = this.listNames[option];
    option = option?.toLowerCase();

    if (!this._voteOptions[option]) return;
    this._voteOptions[option].numberOfVotes++;
  }

  get voteOptions() {
    return { ...this._voteOptions };
  }
}

export class VotingApp {
  private static readonly polls: Voting[] = [];

  static addVoting(voting: Voting): void {
    this.polls.push(voting);
  }

  static showPolls() {
    console.log('showing all pulls:\n');
    for (const voting of this.polls) {
      console.log(voting.details, '\n');
      for (const optionName in voting.voteOptions) {
        const option = voting.voteOptions[optionName];
        console.log(` > ${option.name}: ${option.numberOfVotes}`);
      }
      console.log('\n');
    }
  }
}

const favoriteProgramingLanguage = new Voting('Qual sua linguagem de programação favorita?');
const votingOne = favoriteProgramingLanguage;
const languageOptions = ['Python', 'JavaScript', 'TypeScript', 'Csharp'];

votingOne.addOption(...languageOptions);

votingOne.vote('python');

const favoriteColor = new Voting('Qual sua cor favorita?');
const votingTwo = favoriteColor;
const colors = ['Azul', 'Vermelho', 'Preto', 'Roxo'];

votingTwo.addOption(...colors);

votingTwo.vote('azul');

VotingApp.addVoting(votingOne);
VotingApp.addVoting(votingTwo);
VotingApp.showPolls();

export const banana = '';
