import { usePageContext } from 'vike-react/usePageContext';
import '../assets/tufte.css';
import { A } from '../components/A';
import AnchorLink from '../components/AnchorLink';
import type { Chapter, Sitemap } from '../data/sitemap';
import type { UIStrings } from '../data/ui';
import { LANGUAGES } from '../utils/languages';

const logo = (
  <svg
    width="538"
    height="538"
    viewBox="0 0 538 538"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_3124_471)">
      <path
        d="M439.263 0C433.902 8.76882 396.175 73.4966 347.85 233.362C295.628 406.117 312.5 538 312.5 538H331C331 538 323.863 413.126 375.833 262.11C425.021 119.182 527.198 93.1788 538 90.8037V216.138C524.429 221.629 444.302 256.982 396.581 343.791C344.333 438.836 361.109 537.938 361.119 538H379.5C379.495 537.957 369.225 445.903 409.556 381.46C446.362 322.649 524.578 303.496 538 300.592V380.824C534.653 380.858 472.729 382.083 434.663 427.047C396.591 472.018 407.244 534.638 407.85 538H130.029C130.635 534.638 141.288 472.018 103.216 427.047C65.54 382.544 4.49344 380.888 0 380.826V300.618C13.7645 303.61 91.626 322.823 128.323 381.46C168.651 445.898 158.126 537.942 158.119 538H176.5C176.512 537.927 193.544 438.83 141.299 343.791C93.7174 257.236 13.9187 221.836 0 216.187V90.8301C11.4226 93.3689 113.038 119.701 162.047 262.11C214.007 413.097 207.003 537.952 207 538H225.365C225.375 537.927 242.237 406.069 190.03 233.362C141.705 73.4961 103.977 8.76856 98.6162 0H236.373L257.413 538H280L300.981 0H439.263Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_3124_471">
        <path
          d="M0 269C0 186.069 0 144.604 13.4027 111.843C31.6852 67.1549 67.1549 31.6852 111.843 13.4027C144.604 0 186.069 0 269 0C351.931 0 393.396 0 426.157 13.4027C470.845 31.6852 506.315 67.1549 524.597 111.843C538 144.604 538 186.069 538 269V538H0V269Z"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
);

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  const pageContext = usePageContext();
  const { sitemap, ui } = (pageContext.data as { sitemap: Sitemap; ui: UIStrings }) || {
    sitemap: {},
  };
  const { urlPathname } = pageContext;
  const { lang } = pageContext.routeParams as { lang: string };

  const pathParts = urlPathname.split('/').filter(Boolean);
  const currentDoc = pathParts[1];
  const currentSlug = pathParts[2];

  let currentChapter: Chapter | undefined;
  if (!sitemap) return <main>{children}</main>;

  if (currentDoc && sitemap[currentDoc]) {
    currentChapter = sitemap[currentDoc].find(c => c.slug === currentSlug);
  }

  return (
    <div>
      <header>
        <div className="logo">
          <A href="/">{logo}</A>
        </div>
        <nav className="main">
          {Object.entries(sitemap).map(([doc, chapters]) => {
            const isManifesto = doc === 'manifesto' || doc === 'edict';
            const isCurrentDoc = doc === currentDoc;
            const docStrings = ui ? ui[doc as keyof UIStrings] : null;
            return (
              <div key={doc} className="document">
                <strong>
                  <A href={`/${doc}/`}>
                    {docStrings ? docStrings.short : doc.charAt(0).toUpperCase() + doc.slice(1)}
                  </A>
                </strong>
                {isManifesto && (
                  <>
                    {chapters.map((chapter: Chapter, index: number) => (
                      <span key={chapter.id} className="chapter-link">
                        <A href={chapter.url}>{chapter.name}</A>
                        {index < chapters.length - 1 && ',  '}
                      </span>
                    ))}
                  </>
                )}
                {isCurrentDoc && !isManifesto && currentChapter && (
                  <>
                    {' -> '}
                    <span>{currentChapter.name}</span>
                  </>
                )}
              </div>
            );
          })}
        </nav>
        <div className="languages">
          {LANGUAGES.map(l => (
            <A
              href={pageContext.urlPathname}
              lang={l}
              className={l === lang ? 'is-active' : undefined}
            >
              <strong>{ui.nav[l as keyof typeof ui.nav] || l}</strong>
            </A>
          ))}
        </div>
      </header>
      <main>{children}</main>
      <AnchorLink />
    </div>
  );
}
