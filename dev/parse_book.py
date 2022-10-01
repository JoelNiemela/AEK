import argparse
import json

def main():
	argparser = argparse.ArgumentParser()
	argparser.add_argument('src', type=str, help='Source file to parse.')
	argparser.add_argument('dst', type=str, help='Destination file to write output to.')

	args = argparser.parse_args()

	src = args.src
	dst = args.dst

	section = 'Title'

	sections = {
		section: ''
	}

	titles = {
		section: 'Title'
	}

	with open(src, 'r') as src_file:
		for line in src_file.readlines():
			if line[0] == '*':
				[section, *title] = line[1:].strip().split(':')
				sections[section] = ''
				if not title:
					titles[section] = section
				else:
					titles[section] = ':'.join(title)
			else:
				sections[section] += line

	for chapter in sections.keys():
		with open(f'{dst}/{chapter}.json', 'w') as dst_file:
			dst_file.write(json.dumps({
				'data': sections[chapter],
				'title': titles[chapter],
			}))

if __name__ == '__main__':
	main()
