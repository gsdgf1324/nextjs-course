function UserProfilePage(props) {
  const { username } = props;

  return <h1>{username}</h1>;
}

export default UserProfilePage;

/*
[ getServerSideProps 함수 ]
- 사전 생성이 아닌, 페이지 요청이 서버에 도달할 때마다 실행
- 이 함수는 배포된 서버와 개발 서버에서만 실행된다.
- 요청이 들어올 때마다 함수가 실행된다는 걸 확인해서 사전에 생성된 정적 함수가 아니라는 걸 확인할 때 필요하다.
  예를 들면, 매우 동적인 데이터가 있다고 할 때 데이터가 매초마다 여러 번 바뀌고 어떤 페이지를 제공하던 순식간에 구식 페이지가 된다.
  이럴때 getServerSideProps 함수를 사용한다.
- 반환하는 객체의 데이터 포멧은 getStaticProps 함수와 비슷하다.
  redirect 키는 필요하지 않을 뿐더러 설정할 수 없다. => 정의한 getServerSideProps 함수마다 들어오는 요청에 전부 유효성 검사를 실행하므로 일정 시간이 지나도 유효성 재검사를 실행할 필요가 없다.

[ getServerSideProps 함수가 서버에서만 실행된다는게 무슨 뜻? ]
- context 객체를 보면 알 수 있는데, 요청(req) 객체 전체에도 접근할 수 있으며, 응답(res) 객체에 접근해서 해당 요청을 조정하거나 헤더도 추가할 수 도있다.
- context 객체에 든 여러 값과 키를 얻을 수 있고 매개변수 객체(동적 컴포넌트)에도 여전히 접근할 수 있다.
req 공식문서 https://nodejs.org/api/http.html#http_class_http_incomingmessage
res 공식문서 https://nodejs.org/api/http.html#http_class_http_serverresponse


*/
export async function getServerSideProps(context) {
  const { params, req, res } = context;
  return {
    props: {
      username: "Max",
    },
  };
}
