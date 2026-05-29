export async function shareContent({
  title = 'AI Palm Reader',
  text = '',
  url = window.location.origin
}) {
  if (navigator.share) {
    await navigator.share({ title, text, url });

    return { success: true, method: 'native-share' };
  }

  const shareText = `${title}\n\n${text}\n\n${url}`;

  if (navigator.clipboard) {
    await navigator.clipboard.writeText(shareText);

    return { success: true, method: 'clipboard' };
  }

  throw new Error('Sharing is not supported on this device.');
}

export default shareContent;
