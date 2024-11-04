function skillsMember( member, skills ) {
  return {
    ...member,
    skills: skills.filter( skill => skill.member_id === member.id )
  };
}