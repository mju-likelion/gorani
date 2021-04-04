function randomMessage(winner: number, fighter: string, opponent: string) {
  const messageKind = Math.floor(Math.random() * 3);
  if (winner) {
    switch (messageKind) {
      case 0:
        return `${opponent} 물에 빠져 허우적댑니다! 승자는 ${fighter}!`;
      case 1:
        return `${fighter} 날아온 화살을 가볍게 피하고 반격합니다! ${opponent} 패배!`;
      case 2:
        return `${opponent}에게 파괴광선! 효과는 굉장했다! 승자는 ${fighter}!`;
    }
  }

  switch (messageKind) {
    case 0:
      return `${opponent} 독가스가 살포되었지만 방독면이 있었습니다! ${fighter} 패배!`;
    case 1:
      return `${fighter} 트랩을 밟아버렸습니다! 승자는 ${opponent}!`;
    case 2:
      return `${opponent} 절벽에서 떨어졌지만 낙법에 성공했습니다! ${fighter} 패배!`;
  }

  return "Something went wrong";
}

export default randomMessage;
