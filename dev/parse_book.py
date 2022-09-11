import argparse

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

	with open(src, 'r') as src_file:
		for line in src_file.readlines():
			if line[0] == '*':
				section = line[1:].strip()
				sections[section] = ''
			else:
				sections[section] += line

	with open(dst, 'w') as dst_file:
		dst_file.write('const data = {')
		for name, section in sections.items():
			dst_file.write(f'"{name}":`{section}`,')
		dst_file.write('};')

if __name__ == '__main__':
	main()
