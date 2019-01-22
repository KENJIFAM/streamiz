interface Clipboard {
  writeText(newClipText: string): Promise<void>;
}

interface NavigatorClipboard {
  readonly clipboard?: Clipboard;
}

interface Navigator extends NavigatorClipboard {}

const fallbackCopyTextToClipboard = (text: string) => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  const copyBtn = document.querySelector('.copyBtn');

  try {
    document.execCommand('copy');
    copyBtn.setAttribute('data-tooltip', 'Copied');
  } catch (err) {
    copyBtn.setAttribute('data-tooltip', `Fallback: Oops, unable to copy: ${err}`);
  }

  document.body.removeChild(textArea);
};

export const copyTextToClipboard = (text: string) => {
  const navigatorClipboard = window.navigator as Navigator;
  if (!navigatorClipboard.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  const copyBtn = document.querySelector('.copyBtn');
  navigatorClipboard.clipboard.writeText(text)
    .then(() => copyBtn.setAttribute('data-tooltip', 'Copied'))
    .catch(err => copyBtn.setAttribute('data-tooltip', `Async: Could not copy text: ${err}`));
};

export const resetCopy = () => {
  document.querySelector('.copyBtn').setAttribute('data-tooltip', 'Copy to clipboard');
};