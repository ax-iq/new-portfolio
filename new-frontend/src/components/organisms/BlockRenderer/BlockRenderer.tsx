import Markdown from "@/components/atoms/Markdown/Markdown";
import TimelineConnector from "@/components/atoms/TimelineConnector/TimelineConnector";
import TimelineIcon from "@/components/atoms/TimelineIcon/TimelineIcon";
import Card from "@/components/molecules/Card/Card";
import TimelineContent from "@/components/molecules/TimelineContent/TimelineContent";
import TimelineContentOpposite from "@/components/molecules/TimelineContentOpposite/TimelineContentOpposite";
import TimelineItem from "@/components/molecules/TimelineItem/TimelineItem";
import TimelineSeparator from "@/components/molecules/TimelineSeparator/TimelineSeparator";
import Timeline from "@/components/organisms/Timeline/Timeline";
import type { Block } from "@/interfaces/Block";
import { formatDate } from "@/utils/date/date";

interface BlockRendererProps {
	block: Block;
	currentLang?: string;
	backendBaseUrl: string;
}

export default function BlockRenderer({
	block,
	currentLang = "en",
	backendBaseUrl,
}: BlockRendererProps) {
	switch (block.__component) {
		case "block.experience-grid":
			return (
				<div>
					{/* <Timeline data={block.experiences} /> */}
					<Timeline>
						{block.experiences.map((experience) => {
							return (
								<TimelineItem key={experience.id}>
									<TimelineContentOpposite>
										{`${formatDate(experience.startDate, currentLang)} - ${formatDate(experience.endDate, currentLang)}`}
									</TimelineContentOpposite>
									<TimelineSeparator>
										<TimelineIcon
											src={`${backendBaseUrl}${experience.companyLogo.url}`}
										/>
										<TimelineConnector />
									</TimelineSeparator>
									<TimelineContent>
										<Card
											title={experience.title}
											subTitle={experience.companyName}
											tags={experience.tags}
											date={`${formatDate(experience.startDate, currentLang)} - ${formatDate(experience.endDate, currentLang)}`}
										>
											<Markdown>{experience.description}</Markdown>
										</Card>
									</TimelineContent>
								</TimelineItem>
							);
						})}
					</Timeline>
				</div>
			);
		default:
			return null;
	}
}
