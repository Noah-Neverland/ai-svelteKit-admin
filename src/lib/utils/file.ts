/**
 * 文件处理工具函数
 */

/**
 * 文件上传（基础实现，后续可扩展）
 */
export async function uploadFile(
	file: File,
	url: string,
	onProgress?: (progress: number) => void
): Promise<any> {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		const formData = new FormData();
		formData.append('file', file);

		xhr.upload.addEventListener('progress', (e) => {
			if (e.lengthComputable && onProgress) {
				const progress = (e.loaded / e.total) * 100;
				onProgress(progress);
			}
		});

		xhr.addEventListener('load', () => {
			if (xhr.status === 200) {
				try {
					const response = JSON.parse(xhr.responseText);
					resolve(response);
				} catch (error) {
					resolve(xhr.responseText);
				}
			} else {
				reject(new Error(`Upload failed with status ${xhr.status}`));
			}
		});

		xhr.addEventListener('error', () => {
			reject(new Error('Upload failed'));
		});

		xhr.open('POST', url);
		xhr.send(formData);
	});
}

/**
 * 文件下载
 */
export function downloadFile(url: string, filename?: string): void {
	if (typeof document === 'undefined') {
		console.warn('downloadFile can only be used in browser environment');
		return;
	}
	const link = document.createElement('a');
	link.href = url;
	if (filename) {
		link.download = filename;
	}
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

/**
 * 读取文件内容（文本）
 */
export function readFileAsText(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (e) => resolve(e.target?.result as string);
		reader.onerror = reject;
		reader.readAsText(file);
	});
}

/**
 * 读取文件内容（DataURL）
 */
export function readFileAsDataURL(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (e) => resolve(e.target?.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}
