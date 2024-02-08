export const isCharacterInfo = (
  info: string | CharacterInfo | null
): info is CharacterInfo => {
  return info !== null && (info as CharacterInfo).id > 0;
};
